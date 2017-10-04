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
        //private static string sourceFilePath = "./imageInfo.dat";

        private Image[] images;

        public int Count => images.Length;

        public ImageRepository()
        {
            images = new Image[]
            {
                new Image() { FileName = "img_1.jpg", Description = "Маки" },
                new Image() { FileName = "img_2.jpg", Description = "Of on affixed civilly moments promise explain fertile in" },
                new Image() { FileName = "img_3.jpg", Description = "images" },
                new Image() { FileName = "img_6.jpg", Description = "Five he wife gone ye" },
                new Image() { FileName = "img_5.jpg", Description = "Greatest properly off ham exercise all." },
                new Image() { FileName = "img_4.jpg", Description = "Дочерние теги, как и сам родитель" },
                new Image() { FileName = "img_7.jpg", Description = "Unsatiable invitation its possession nor off" },
                new Image() { FileName = "img_8.jpg", Description = "image" },
                new Image() { FileName = "img_9.jpg", Description = "digits" },
            };
        }

        public IEnumerable<Image> GetSequence(int offset, int count)
        {
            return images.Skip(offset).Take(count);
        }

        //private Image[] Load()
        //{
        //    Image[] result;

        //    using (var reader = new BinaryReader(File.OpenRead(sourceFilePath)))
        //    {
        //        result = new Image[reader.ReadInt32()];
        //        for (int i = 0; i < result.Length; i++)
        //        {
        //            result[i] = new Image()
        //            {
        //                FileName = reader.ReadString(),
        //                Description = reader.ReadString(),
        //            };
        //        }
        //    }

        //    return result;
        //}

        //private void Save()
        //{
        //    using (var writer = new BinaryWriter(File.Open(sourceFilePath, FileMode.OpenOrCreate, FileAccess.Write)))
        //    {
        //        writer.Write(images.Length);
        //        foreach (var image in images)
        //        {
        //            writer.Write(image.FileName);
        //            writer.Write(image.Description);
        //        }
        //    }
        //}
    }
}
