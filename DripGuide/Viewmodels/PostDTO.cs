using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DripGuide.Viewmodels
{
    public class PostDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Description2 { get; set; }

        public string Material { get; set; }

        public int Price { get; set; }

        public DateTime ReleaseDate { get; set; }

        public string StyleCode { get; set; }

        public string Colorway { get; set; }

        public int FK_Brand { get; set; }

        public string Image { get; set; }
    }
}
