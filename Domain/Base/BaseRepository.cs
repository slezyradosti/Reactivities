using System.ComponentModel.DataAnnotations;

namespace Domain.Base
{
    public class BaseRepository
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
    }
}
