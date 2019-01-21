//
//  BugDetailViewController.swift
//  trycatching
//
//  Created by Young on 2018/12/25.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit

class BugDetailViewController: UIViewController {

    var bugContent = ""
    
    @IBOutlet weak var bugTextView: UITextView!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.bugTextView.text = bugContent
    }
    
    @IBAction func closeButtonClick(_ sender: UIButton) {
        self.dismiss(animated: true) {
            
        }
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
