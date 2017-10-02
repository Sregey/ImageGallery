using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dal;

namespace ImageGallery.Controllers
{
    public class HomeController : Controller
    {
        IImageRepository imageRepository;

        public HomeController()
        {
            //imageRepository = new ImageRepository();
        }

        public ActionResult Index()
        {
            //ViewBag.Images = imageRepository.GetSequence(0, 4);
            return View();
        }
    }
}