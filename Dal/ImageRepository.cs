using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class ImageRepository : IImageRepository
    {
        private static string sourceFolder = "~/Images";

        private Image[] images;

        public int Count => images.Length;

        public ImageRepository()
        {
            images = new Image[]
            {
                new Image() { FileName = "img1.jpg", Description = "Маки" },
                new Image() { FileName = "img2.jpg", Description = "img2" },
                new Image() { FileName = "images.jpg", Description = "images" },
                new Image() { FileName = "1472042512_05.jpg", Description = "digits" },
                new Image() { FileName = "315193.jpg", Description = "315193" },
            };
            //imageFileNames = Directory.GetFiles(sourceFolder);
        }

        public IEnumerable<Image> GetSequence(int offset, int count)
        {
            return images.Skip(offset).Take(count);
        }
    }
}
