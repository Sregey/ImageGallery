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
        //private static string sourceFolder = @"G:\Epam\Лабоатория .NET\ImageGallery\Dal\bin\Debug\Images\";
        private static string sourceFolder = "~/Images";

        private string[] imageFileNames;

        public ImageRepository()
        {
            imageFileNames = Directory.GetFiles(sourceFolder);
        }

        public IEnumerable<string> GetSequence(int offset, int count)
        {
            return imageFileNames.Skip(offset).Take(count);//.Select((s) => '\"' + s + '\"');
        }
    }
}
