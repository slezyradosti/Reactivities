﻿using Domain.Base;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Activity : BaseRepository
    {
        [StringLength(50)]
        public string Title { get; set; }
        [StringLength(300)]
        public string Description { get; set; }
        [StringLength(50)]
        public string Category { get; set; }
        [StringLength(50)]
        public string City { get; set; }
        [StringLength(100)]
        public string Venue { get; set; }
        public bool IsCancelled { get; set; }

        public ICollection<ActivityAppuser> Appusers { get; set;} = new List<ActivityAppuser>();
        public ICollection<Comment> Comments { get; set;} = new List<Comment>();
    }
}
