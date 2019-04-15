//
//  LoginViewController.swift
//  trycatching
//
//  Created by Young on 2018/11/8.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    
    var currentTextField : UITextField? = nil
    
    @IBAction func signinClick(_ sender: UIButton) {
        self.activityIndicator.startAnimating()
        self.emailTextField.isEnabled = false
        self.passwordTextField.isEnabled = false
        (sender as UIButton).isEnabled = false
        Network.shared.post(body: ["account_name":self.emailTextField.text!,"password": Utils.md5(content: self.passwordTextField.text!) ], path: "user/signinfrommobile") { (responseDic) in
            DispatchQueue.main.async(execute: {
                self.activityIndicator.stopAnimating()
                let msgDic = responseDic["msg"] as! NSDictionary
                if (msgDic["code"] as! Int) == 0 {
                    let dtStr = XGPushTokenManager.default().deviceTokenString
                    if  dtStr != nil {
                        Network.shared.post(body: ["uid": responseDic["uid"]!, "account_name": self.emailTextField.text!, "device_token": dtStr!], path: "apns/devicetoken", callback: { (resDic) in
                            print(resDic)
                        })
                    }
                    UserDefaults.standard.set(responseDic["uid"], forKey: Constant.TTFUID)
                    (UIApplication.shared.delegate as! AppDelegate).setRootViewController(flag: 1)
                }else{
                    self.emailTextField.isEnabled = true
                    self.passwordTextField.isEnabled = true
                    (sender as UIButton).isEnabled = true
                    let alert = UIAlertController.init(title: "Login error", message: (msgDic["content"] as! String), preferredStyle:.alert)
                    alert.addAction(UIAlertAction.init(title: "OK", style: .default, handler: nil))
                    self.present(alert, animated: true, completion: nil)
                }
            })
            
        }

    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.activityIndicator.stopAnimating()
        self.emailTextField.delegate = self
        self.passwordTextField.delegate = self
        
        let viewTapGesture = UITapGestureRecognizer(target: self, action: #selector(self.viewTapEvent(sender:)))
        self.view.addGestureRecognizer(viewTapGesture)
    }

    @objc func viewTapEvent(sender: UITapGestureRecognizer) {
        if sender.state == .ended {
            self.currentTextField?.resignFirstResponder()
        }
    }
    
    // MARK: TextField delegate
    func textFieldDidBeginEditing(_ textField: UITextField) {
        self.currentTextField = textField
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
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
