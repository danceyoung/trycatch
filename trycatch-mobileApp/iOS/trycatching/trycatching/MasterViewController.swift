//
//  MasterViewController.swift
//  trycatching
//
//  Created by Young on 2018/11/5.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit

class MasterViewController: UITableViewController {

    var detailViewController: DetailViewController? = nil
    var objects = [Any]()


    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        navigationItem.leftBarButtonItem = editButtonItem

        let addButton = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(insertNewObject(_:)))
        navigationItem.rightBarButtonItem = addButton
        if let split = splitViewController {
            let controllers = split.viewControllers
            detailViewController = (controllers[controllers.count-1] as! UINavigationController).topViewController as? DetailViewController
        }
        
        let cellNib = UINib.init(nibName: "ProjectCellTableViewCell", bundle: nil)
        tableView.register(cellNib, forCellReuseIdentifier: "ProjectCellTableViewCell")
        
        let url = URL.init(string: "http://10.8.0.85:8000/project/list")
        let request = NSMutableURLRequest.init(url: url!)
        request.httpMethod = "POST"
        request.httpBody = "{\"uid\":\"ZGFuY2V5b3VuZ0Bob3RtYWlsLmNvbQ\"}".data(using: String.Encoding.utf8)
        
        let urlSession = URLSession.shared

        let urlSessionDataTask = urlSession.dataTask(with: request as URLRequest) { (data, response, err) in
            do{
                let resJson = try JSONSerialization.jsonObject(with: data!, options: JSONSerialization.ReadingOptions.allowFragments)
                print("project list \(resJson)")
                let resDic = resJson as! NSDictionary
                let projectsArray = (resDic["projects"]! as! NSArray)
                self.objects = projectsArray as! [Any]
                
                DispatchQueue.main.async(execute: {
                    self.tableView.reloadData()
                })
            }catch{
                print(error)
            }
        }
        
        urlSessionDataTask.resume()
        
    }

    override func viewWillAppear(_ animated: Bool) {
        clearsSelectionOnViewWillAppear = splitViewController!.isCollapsed
        super.viewWillAppear(animated)
    }

    @objc
    func insertNewObject(_ sender: Any) {
        objects.insert(NSDate(), at: 0)
        let indexPath = IndexPath(row: 0, section: 0)
        tableView.insertRows(at: [indexPath], with: .automatic)
    }

    // MARK: - Segues

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showDetail" {
            if let indexPath = tableView.indexPathForSelectedRow {
                let object = objects[indexPath.row] as! NSDate
                let controller = (segue.destination as! UINavigationController).topViewController as! DetailViewController
                controller.detailItem = object
                controller.navigationItem.leftBarButtonItem = splitViewController?.displayModeButtonItem
                controller.navigationItem.leftItemsSupplementBackButton = true
            }
        }
    }

    // MARK: - Table View

    override func numberOfSections(in tableView: UITableView) -> Int {
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

    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }

    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            objects.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view.
        }
    }


}

