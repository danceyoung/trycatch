//
//  PrivacyViewController.swift
//  trycatching
//
//  Created by Young on 2019/4/18.
//  Copyright © 2019 young. All rights reserved.
//

import UIKit
import WebKit
class PrivacyViewController: UIViewController {

    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.modalPresentationCapturesStatusBarAppearance = true
        let webView = WKWebView.init(frame: CGRect.init(x: 0, y: 60, width: view.frame.width, height: view.frame.height-60), configuration: WKWebViewConfiguration())
        view.backgroundColor = .white
        let fileUrl = Bundle.main.path(forResource: "privacy_policy", ofType: "html")
        
        webView.loadFileURL(URL.init(fileURLWithPath: fileUrl!), allowingReadAccessTo: URL.init(fileURLWithPath: fileUrl!))
        view.addSubview(webView)
        let backButton = UIButton.init(frame: CGRect.init(x: 0, y: 25, width: 60, height: 30))
        backButton.setTitle("Close", for: .normal)
        backButton.setTitleColor(UIColor.init(red: 0x3b/255, green: 0x67/255, blue: 0xbc/255, alpha: 1), for: .normal)
        backButton.addTarget(self, action: #selector(backButtonClick(sender:)), for: .touchUpInside)
        view.addSubview(backButton)
        
    }
    

    @objc func backButtonClick(sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
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
