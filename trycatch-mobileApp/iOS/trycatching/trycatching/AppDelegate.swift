//
//  AppDelegate.swift
//  trycatching
//
//  Created by Young on 2018/11/5.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit
import IQKeyboardManagerSwift

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, UISplitViewControllerDelegate, XGPushDelegate {

    var window: UIWindow?

    func setRootViewController(flag: Int)->Void{
        if flag == 1 {
            self.window?.rootViewController = UIStoryboard(name: "Main", bundle: nil).instantiateInitialViewController()
        }else {
            window!.rootViewController = LoginViewController()
        }
    }
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization                 after application launch.
        IQKeyboardManager.shared.enable = true
        if UserDefaults.standard.object(forKey: Constant.TTFUID) == nil {
            setRootViewController(flag: 0)
        }else{
            setRootViewController(flag: 1)
        }
        XGPush.defaultManager().isEnableDebug = true
        XGPush.defaultManager().notificationConfigure = XGNotificationConfigure(notificationWithCategories: nil, types: [.alert, .sound, .badge])
        XGPush.defaultManager().startXG(withAppID: Constant.XGAPPID, appKey: Constant.XGAPPSECRET, delegate: self)
        
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
        print("application will enter foreground.")
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
    

    // MARK: - xgPushDelegate
    func xgPush(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse?, withCompletionHandler completionHandler: @escaping () -> Void) {
        let temp = response?.notification.request.content.userInfo
        
        print("xgPush did receive notification \(temp!)")
        
        XGPush.defaultManager().reportXGNotificationResponse(response)
        completionHandler()
    }
    
    func xgPush(_ center: UNUserNotificationCenter, willPresent notification: UNNotification?, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        print("app is in forground")
        
        guard let userInfo = notification?.request.content.userInfo else {
            return
        }
        
        XGPush.defaultManager().reportXGNotificationInfo(userInfo)
        
    }
    
    func xgPushDidRegisteredDeviceToken(_ deviceToken: String?, error: Error?) {
        guard deviceToken != nil else {
            print("xgPushDidRegisteredDeviceToken occur error \(error.debugDescription)")
            return
        }
        print("registered device token is \(deviceToken!)")
    }
    
    func xgPushDidFinishStart(_ isSuccess: Bool, error: Error?) {
        guard isSuccess == true else {
            print("\(String(describing: error))")
            return
        }
        
        print("xgPushDidFinishStart is successfully")
        
    }
    
    // MARK: - Split view

    func splitViewController(_ splitViewController: UISplitViewController, collapseSecondary secondaryViewController:UIViewController, onto primaryViewController:UIViewController) -> Bool {
        guard let secondaryAsNavController = secondaryViewController as? UINavigationController else { return false }
        guard let topAsDetailController = secondaryAsNavController.topViewController as? DetailViewController else { return false }
        if topAsDetailController.detailItem == nil {
            // Return true to indicate that we have handled the collapse by doing nothing; the secondary controller will be discarded.
            return true
        }
        return false
    }

}

