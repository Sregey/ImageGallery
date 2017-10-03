using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Mvc;
using Dal;

namespace ImageGallery.Controllers
{
    public class HomeController : Controller
    {
        private const int DEFAULT_COUNT_OF_IMAGES = 4;

        private IImageRepository imageRepository;

        public HomeController()
        {
            imageRepository = new ImageRepository();
        }

        public ActionResult Index(int? offset, int? count)
        {
            //string filePath = Server.MapPath(Url.Content("~/Images/img1.jpg"));

            int allImagesCount = imageRepository.Count;

            if ((offset == null) || (offset < 0) || (offset >= allImagesCount))
                offset = 0;
            if (count == null || (count < 0))
                count = DEFAULT_COUNT_OF_IMAGES;

            ViewBag.PrevOffset = (offset >= count) ? (offset - count) : -1;
            ViewBag.NextOffset = (offset + count <= imageRepository.Count) ? (offset + count) : -1;
            ViewBag.Count = count;

            ViewBag.Images = imageRepository.GetSequence(offset.Value, count.Value);
            return View();
        }
    }
}