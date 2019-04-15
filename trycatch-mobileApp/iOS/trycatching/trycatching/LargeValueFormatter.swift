//
//  LargeValueFormatter.swift
//  trycatching
//
//  Created by Young on 2019/4/8.
//  Copyright © 2019 young. All rights reserved.
//

import Foundation
import Charts
class LargeValueFormatter: IValueFormatter {
    func stringForValue(_ value: Double, entry: ChartDataEntry, dataSetIndex: Int, viewPortHandler: ViewPortHandler?) -> String {
        return NumberFormatter.localizedString(from: NSNumber(value: value), number: .none)
    }
}
