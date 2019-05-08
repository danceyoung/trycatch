//
//  ProjectTableViewController.swift
//  trycatching
//
//  Created by Young on 2018/12/7.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit

class ProjectTableViewController: UITableViewController {
    var objects = [Any]()
    var selectedPId = ""

    
    @objc func appWillEnterForgroundEvent() {
        pullProjects()
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationItem.title = "Projects"
        
        let cellNib = UINib.init(nibName: "ProjectCellTableViewCell", bundle: nil)
        self.tableView.register(cellNib, forCellReuseIdentifier: "ProjectCellTableViewCell")

//        self.refreshControl?.addTarget(self, action: #selector(pullProjects), for: .valueChanged)
        refreshControl?.beginRefreshing()

        NotificationCenter.default.addObserver(self, selector: #selector(appWillEnterForgroundEvent), name: UIApplication.willEnterForegroundNotification, object: nil)
        
        //        pullProjects()
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.pullProjects()
    }
    
    func pullBugsChartData() {
        objects.enumerated().forEach { (idx, project) in
            let dicProject = project as! NSDictionary
            let tempUid = UserDefaults.standard.string(forKey: Constant.TTFUID)!
            let tempProjectId = dicProject["project_id"] as! String
            Network.shared.post(body: ["uid" : tempUid, "project_id" : tempProjectId], path: "project/receivefromlist") { (responseDic) in
                let msgDic = responseDic["msg"] as! NSDictionary
                if msgDic["code"] as! Int == 0 {
                    let debuggers = responseDic["receive_from_list"] as! [NSDictionary]
                    let uids = debuggers.map {$0["user_id"]} as! [String]
                    Network.shared.post(body: ["uid": tempUid, "project_id":tempProjectId, "debugger_ids": uids], path: "project/bugsChart", callback: { (responseDic) in
                        let msgDic = responseDic["msg"] as! NSDictionary
                        if msgDic["code"] as! Int == 0 {
                           dicProject.setValue(responseDic["chart"], forKey: "chart")
                            DispatchQueue.main.async {
                                let rowsReload = [IndexPath.init(row: idx, section: 0)]
                                
                                self.tableView.reloadRows(at: rowsReload, with: .none)
                            }
//                            print("data after fetching chartdatas ", project)
                        }
                    })
                }
            }
        }
        
    }
    
    @objc func pullProjects() {
        UIApplication.shared.applicationIconBadgeNumber = 0
        UNUserNotificationCenter.current().removeAllDeliveredNotifications()
        
        Network.shared.post(body: ["uid":UserDefaults.standard.string(forKey: Constant.TTFUID)!], path: "project/list") { (responseDic) in
            print("I retrived data is \(responseDic)")
            let msgDic = responseDic["msg"] as? NSDictionary
            let intCode = msgDic?["code"] as? Int
            switch intCode {
            case 0:
                let projectsArray = (responseDic["projects"]! as! NSArray)
                self.objects = projectsArray as! [Any]
                DispatchQueue.main.async(execute: {
                    self.tableView.reloadData()
                })
                self.pullBugsChartData()

            case 12:
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "", message: "No any project about you, please contact your admin or create youself project.", preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                }
            default:
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "", message: Constant.SERVERERRORMSG, preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                }
            }
            DispatchQueue.main.async(execute: {
                if self.tableView.refreshControl!.isRefreshing {
                    self.tableView.refreshControl?.endRefreshing()
                }
            })

        }
        
    }
    
    // MARK: - segue
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "seguedebugtableviewcontroller" {
            let debugVC = segue.destination as! DebugTableViewController
            debugVC.uidProId=(UserDefaults.standard.string(forKey: Constant.TTFUID)!, selectedPId)
        }
        switch segue.identifier {
        case "seguedebugtableviewcontroller":
            let debugVC = segue.destination as! DebugTableViewController
            debugVC.uidProId=(UserDefaults.standard.string(forKey: Constant.TTFUID)!, selectedPId)
        default: break
            
        }
    }
    
    // MARK: - Scroll view delegate
    
    override func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
        if self.refreshControl!.isRefreshing {
            pullProjects()
        }
        print(scrollView.contentOffset)
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return objects.count
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 200.00
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "ProjectCellTableViewCell", for: indexPath) as! ProjectCellTableViewCell

        let object = objects[indexPath.row] as! NSDictionary
        //        cell.textLabel!.text = object.description
        
        cell.projectNameLabel.text = object["project_name"] as? String
        cell.codeLabel.text = object["source_code"] as? String
        cell.memberLabel.text = String(object["members"] as! Int)
        cell.setChartData(data: object["chart"] as? Array ?? [Int]())
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let project = objects[indexPath.row] as! NSDictionary
        selectedPId = (project["project_id"] as? String)!
        self.performSegue(withIdentifier: "seguedebugtableviewcontroller", sender: nil)
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
