//
//  Network.swift
//  trycatching
//
//  Created by Young on 2018/12/13.
//  Copyright © 2018 young. All rights reserved.
//

import Foundation

class Network {
    static let shared = Network()
    private init(){}
    
    func post(body: NSMutableDictionary, path: String, callback: @escaping (NSDictionary)->Void)  {

        let rootUrl = (Constant.DEBUG == true) ? "http://10.8.0.85:8000/" : "http://65.52.178.219:8000/"
        let url = URL.init(string: rootUrl + path)
        var urlRequest = URLRequest.init(url: url!)
        print("request path is \(path), body is \(body) ")
        do{
            urlRequest.httpBody = try JSONSerialization.data(withJSONObject: body, options: JSONSerialization.WritingOptions.prettyPrinted)
        }
        catch{
            
        }
        urlRequest.httpMethod = "POST"
        let urlSession = URLSession.shared
        let urlSessionDataTask = urlSession.dataTask(with: urlRequest) { (data, response, error) in
            do{
                let responseJson = try JSONSerialization.jsonObject(with: data!, options:JSONSerialization.ReadingOptions.mutableContainers)
                let responseDic = responseJson as! NSDictionary
                print("request path is " + path + ", response is : \(responseJson)")
                callback(responseDic)
                
            }catch{
               print(error)
            }
        }
        
        urlSessionDataTask.resume()
        
    }
}
