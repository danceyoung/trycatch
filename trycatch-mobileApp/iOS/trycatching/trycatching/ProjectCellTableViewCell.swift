//
//  ProjectCellTableViewCell.swift
//  trycatching
//
//  Created by Young on 2018/11/7.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit
import Charts

class ProjectCellTableViewCell: UITableViewCell {

    @IBOutlet weak var projectNameLabel: UILabel!
    @IBOutlet weak var codeLabel: UILabel!
    @IBOutlet weak var memberLabel: UILabel!
    @IBOutlet weak var lineChartView: LineChartView!
    
    internal var chartData = [Int]()
    
    internal func setChartData(data: [Int]) {
        if data.max() == 0 {
            lineChartView.data = nil
            return
        }
        var xyValues = [ChartDataEntry]()
        for (index, value) in data.enumerated() {
            let cde = ChartDataEntry.init(x: Double(index+1), y: Double(value))
            xyValues.append(cde)
        }
        let lineChartDataSet = LineChartDataSet.init(values: xyValues, label: "my")
        lineChartDataSet.valueFormatter = LargeValueFormatter()
        let lineChartData = LineChartData.init(dataSet: lineChartDataSet)
        lineChartDataSet.setCircleColor(.lightGray)
        lineChartDataSet.circleRadius = 2
        lineChartDataSet.drawCircleHoleEnabled = false
        //        lineChartDataSet.drawFilledEnabled = true
        //        lineChartDataSet.fillColor = .red
        //        lineChartDataSet.fillAlpha = 0.8
        lineChartDataSet.setColor(.lightGray
        )
        lineChartView.data = lineChartData
        
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        lineChartView.backgroundColor = UIColor.groupTableViewBackground
        lineChartView.legend.enabled = false
        lineChartView.chartDescription?.enabled = false
        lineChartView.rightAxis.enabled = false
        lineChartView.drawGridBackgroundEnabled = false
        lineChartView.xAxis.drawGridLinesEnabled = false
        lineChartView.xAxis.enabled = false
        lineChartView.leftAxis.drawGridLinesEnabled = false
        lineChartView.leftAxis.enabled = false
        lineChartView.noDataText = "No bug is impossible."
        lineChartView.noDataTextColor = .lightGray
        
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
