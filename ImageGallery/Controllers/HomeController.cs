using System.Web.Mvc;
using Dal;
using System.Threading;

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
            int allImagesCount = imageRepository.Count;

            if ((offset == null) || (offset < 0) || (offset >= allImagesCount))
                offset = 0;
            if (count == null || (count < 0))
                count = DEFAULT_COUNT_OF_IMAGES;

            var images = imageRepository.GetSequence(offset.Value, count.Value);
            if (!Request.IsAjaxRequest())
            {
                ViewBag.PrevOffset = (offset >= count) ? (offset - count) : -1;
                ViewBag.NextOffset = (offset + count <= imageRepository.Count) ? (offset + count) : -1;
                ViewBag.Count = count;
                return View(images);
            }
            else
            {
                //Thread.Sleep(1000);
                return Json(imageRepository.GetSequence(offset.Value, DEFAULT_COUNT_OF_IMAGES), JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult CountOfImages()
        {
            return Json(imageRepository.Count, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Angular()
        {
            return View();
        }
    }
}