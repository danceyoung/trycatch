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

    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationItem.title = "Projects"
        
        let cellNib = UINib.init(nibName: "ProjectCellTableViewCell", bundle: nil)
        self.tableView.register(cellNib, forCellReuseIdentifier: "ProjectCellTableViewCell")

        self.refreshControl?.addTarget(self, action: #selector(pullProjects), for: .valueChanged)
        refreshControl?.beginRefreshing()
        pullProjects()
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }
    
    
    @objc func pullProjects() {
        Network.shared.post(body: ["uid":UserDefaults.standard.string(forKey: Constant.TTFUID)!], path: "project/list") { (responseDic) in
            print("I retrived data is \(responseDic)")
            let projectsArray = (responseDic["projects"]! as! NSArray)
            self.objects = projectsArray as! [Any]
            
            DispatchQueue.main.async(execute: {
                self.tableView.reloadData()
                self.refreshControl?.endRefreshing()
            })
        }
    }
    
    // MARK: - segue
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "seguedebugtableviewcontroller" {
            let debugVC = segue.destination as! DebugTableViewController
            debugVC.uidProId=(UserDefaults.standard.string(forKey: Constant.TTFUID)!, selectedPId)
        }
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
        return 100.00
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "ProjectCellTableViewCell", for: indexPath) as! ProjectCellTableViewCell

        let object = objects[indexPath.row] as! NSDictionary
        //        cell.textLabel!.text = object.description
        
        cell.projectNameLabel.text = object["project_name"] as? String
        cell.codeLabel.text = object["source_code"] as? String
        cell.memberLabel.text = String(object["members"] as! Int)

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
