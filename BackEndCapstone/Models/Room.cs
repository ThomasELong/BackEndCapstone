﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Models
{
    public class Room
    {
        public int id { get; set; }
        [Required]
        public string name { get; set; }
    }
}
