//
//  PBugTableViewCell.swift
//  trycatching
//
//  Created by Young on 2018/12/20.
//  Copyright © 2018 young. All rights reserved.
//

import UIKit

class PBugTableViewCell: UITableViewCell {

    @IBOutlet weak var debugerLabel: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var bugTextView: UITextView!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
