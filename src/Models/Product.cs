namespace Models
{
    public class Product : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public decimal Price{get;set;}
        
    }
}