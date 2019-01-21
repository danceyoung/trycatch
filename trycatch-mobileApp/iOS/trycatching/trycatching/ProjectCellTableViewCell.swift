//
//  ProjectCellTableViewCell.swift
//  trycatching
//
//  Created by Young on 2018/11/7.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit

class ProjectCellTableViewCell: UITableViewCell {

    @IBOutlet weak var projectNameLabel: UILabel!
    @IBOutlet weak var codeLabel: UILabel!
    @IBOutlet weak var memberLabel: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
