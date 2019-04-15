//
//  MoreViewController.swift
//  trycatching
//
//  Created by Young on 2019/4/1.
//  Copyright © 2019 young. All rights reserved.
//

import UIKit

class MoreViewController: UIViewController {

    @IBAction func logoutButtonClick(_ sender: UIButton) {
        let alert = UIAlertController.init(title: "Logout", message: "Are you logout?", preferredStyle: .alert)
        let actionOk = UIAlertAction.init(title: "Ok", style: .destructive) { (action) in
            UserDefaults.standard.removeObject(forKey: Constant.TTFUID)
            (UIApplication.shared.delegate as! AppDelegate).setRootViewController(flag: 0)
        }
        let actionCancel = UIAlertAction.init(title: "Cancel", style: .cancel, handler: nil)
        alert.addAction(actionCancel)
        alert.addAction(actionOk)
        self.present(alert, animated: true, completion: nil)
        
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
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
