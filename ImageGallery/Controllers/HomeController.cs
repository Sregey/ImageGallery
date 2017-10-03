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
        IImageRepository imageRepository;

        public HomeController()
        {
            imageRepository = new ImageRepository();
        }

        public ActionResult Index()
        {
            //string filePath = Server.MapPath(Url.Content("~/Images/img1.jpg"));
            //Stream stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read);
            //FileStreamResult s = new FileStreamResult(stream, "image//jpg");
            //ViewBag.Image = s;

            ViewBag.Images = imageRepository.GetSequence(0, 3);
            return View();
        }
    }
}