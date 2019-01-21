//
//  DebugTableViewController.swift
//  trycatching
//
//  Created by Young on 2018/12/7.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit
import selectmultiplebuttons

class DebugTableViewController: UITableViewController, SelectMultipleButtonsDelegate {

    var uidProId:(String, String)=("","")
    var debuggers = [NSDictionary]()
    var idsSelected = [String]()
    var bugs = [Any]()
    var sectionHeaderHeight: CGFloat = 10
    var fetchPage = 1
    var loadingMore = true
    var bugSelectedIndex = 0
    
    let buttonTitleArray = ["riding and niuer", "danceyoung", "sword", "dd", "icelee", "leev10031223", "riding and niuer", "danceyoung", "brokensword", "icelee", "leev10031223"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let bugCellNib = UINib.init(nibName: "PBugTableViewCell", bundle: nil)
        tableView.register(bugCellNib, forCellReuseIdentifier: "projectbugtableviewcell")
        
        refreshControl?.addTarget(self, action: #selector(pullDebugers), for: .valueChanged)
        refreshControl?.beginRefreshing()
        
        pullDebugers()
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }

    @objc func pullDebugers() {
        self.bugs.removeAll()
        self.fetchPage = 1
        Network.shared.post(body: ["uid" : uidProId.0, "project_id" : uidProId.1], path: "project/receivefromlist") { (responseDic) in
            let msgDic = responseDic["msg"] as! NSDictionary
            if msgDic["code"] as! Int == 0 {
                self.debuggers = responseDic["receive_from_list"] as! [NSDictionary]
                self.idsSelected = self.debuggers.map {$0["user_id"]} as! [String]
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
                
                self.pullBugs(self.idsSelected as NSArray)
            }else {
                
            }
        }
    }
    
    func pullBugs(_ ids: NSArray) {
        Network.shared.post(body: ["uid" : uidProId.0, "project_id" : uidProId.1, "debugger_ids" : ids, "fetch_page" : fetchPage], path: "project/bugs") { (responseDic) in
            DispatchQueue.main.async(execute: {
                let msgDic = responseDic["msg"] as! NSDictionary
                let code = msgDic["code"] as! Int
                if code == 0 || code == Constant.NOMOREDATACODE {
                    self.bugs = self.bugs + (responseDic["bugs"] as! [Any])
                    self.tableView.reloadData()
                    self.fetchPage = self.fetchPage + 1
                }else {
                    
                }
                self.refreshControl?.endRefreshing()
                self.loadingMore = false
            })
            
            
        }
    }
    
    // MARK: - SelectMultipleButtonsDelegate
    func numberOf(selectMultipleButtons: SelectMultipleButtons) -> Int {
        return self.debuggers.count
    }
    
    func buttonOf(selectMultipleButtons: SelectMultipleButtons, atIndex index: Int) -> UIButton {
        let button = UIButton()
        let debugger = self.debuggers[index]
        button.setTitle(debugger["alias"] as? String, for: .normal)
        button.setTitleColor(UIColor(red: 0x3B/255, green: 0x67/255, blue: 0xBC/255, alpha: 1), for: .normal)
        button.setBackgroundColor(UIColor(red: 0xEF/255, green: 0xF7/255, blue: 0xFF/255, alpha: 1), for: .normal)
        button.setTitleColor(.black, for: .selected)
        button.setBackgroundColor(UIColor(red: 0xFF/255, green: 0xD3/255, blue: 0x5B/255, alpha: 1), for: .selected)
        button.isSelected = true
        
        
        return button
    }
    
    func styleConfigOf(selectMultipleButtons: SelectMultipleButtons) -> StyleConfig {
        return StyleConfig(edgeSpace: EdgeSpace(), betweenSpace: BetweenSpace(), systemFontSize: 18)
    }

    func didSingleTapOf(selectMultipleButtons: SelectMultipleButtons, atIndex index: Int) {
        print("button \(buttonTitleArray[index]) did single taped at \(index) index")
    }
    
    func indexesSelectedOf(selectMultipleButtons: SelectMultipleButtons, didChange indexes: [Int]) {
        print("indices selected \(indexes) did change")
        self.idsSelected.removeAll()
        for (index, item) in self.debuggers.enumerated() {
            if indexes.contains(index) {
                self.idsSelected.append(item["user_id"] as! String)
            }
        }
        self.bugs.removeAll()
        self.pullBugs(self.idsSelected as NSArray)
    }
    
    // MARK: - Scroll view delegate
    override func scrollViewDidEndDragging(_ scrollView: UIScrollView, willDecelerate decelerate: Bool) {
        if scrollView.frame.height > (scrollView.contentSize.height - scrollView.contentOffset.y) {
            if !loadingMore {
                self.loadingMore = true
                pullBugs(self.idsSelected as NSArray)
            }
        }
        
    }
    
    
    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }
    
    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = SelectMultipleButtons.init(frame: CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: 10))
        headerView.delegate = self
        headerView.load()
        sectionHeaderHeight = headerView.frame.size.height
        print("sectionHeight \(sectionHeaderHeight), \(headerView.frame.size.height)")
        return headerView
    }
    
    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        print("sectionheight \(sectionHeaderHeight)")
        return self.sectionHeaderHeight
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return bugs.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "projectbugtableviewcell", for: indexPath) as! PBugTableViewCell
        let bugDic = bugs[indexPath.row] as! NSDictionary
        cell.debugerLabel.text = bugDic["alias"] as? String
        cell.dateLabel.text = ""
        cell.bugTextView.text = bugDic["content"] as? String

        return cell
    }
 
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 150
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        bugSelectedIndex = indexPath.row
        self.performSegue(withIdentifier: "presentpopoverbugssegue", sender: nil)
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

    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        let bugvc = segue.destination as! BugDetailViewController
        let bugDic = bugs[bugSelectedIndex] as! NSDictionary
        bugvc.bugContent = bugDic["content"] as! String
    }
    
}
