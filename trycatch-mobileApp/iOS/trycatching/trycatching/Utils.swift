//
//  Utils.swift
//  trycatching
//
//  Created by Young on 2018/12/14.
//  Copyright © 2018 young. All rights reserved.
//

import Foundation
import CryptoSwift
class Utils {
static func md5(content: String)->String {
    return content.md5()
}
}
