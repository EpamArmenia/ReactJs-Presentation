using Microsoft.AspNetCore.Mvc;
using Models;
using System.Linq;
using Extensions;

namespace react_presentation.Controllers
{
    public class ProductsController : Controller
    {
        private ProductsContext productsContext;
        public ProductsController(ProductsContext prc)
        {
            this.productsContext = prc;
        }

        [HttpGet]
        public JsonResult GetProducts()
        {
            try
            {
                var res = Json(this.productsContext.Products.ToList());
                return res;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public JsonResult AddNewProduct([FromBody] Product pr)
        {
            try
            {
                this.productsContext.Products.AddOrUpdate(pr);

                this.productsContext.SaveChanges();
                var res = Json(pr);
                return res;
            }
            catch (System.Exception ex)
            {
                return Json(ex);
                throw;
            }

        }

        [HttpPost]
        public JsonResult DeleteProduct(int id)
        {
            try
            {
                this.productsContext.Products.DeleteById(id);
                this.productsContext.SaveChanges();
                var res = Json(true);
                return res;
            }
            catch (System.Exception ex)
            {
                return Json(ex);
                throw;
            }

        }
    }
}