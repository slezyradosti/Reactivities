using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Photo
    {
        [Key]
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string AppUserId { get; set; }

        [JsonIgnore]
        public AppUser AppUser { get; set; }
    }
}
