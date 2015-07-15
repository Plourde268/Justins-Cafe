using JustinsCafe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace JustinsCafe.Controllers.api
{
    public class MenuController : ApiController
    {
        ApplicationDbContext _db = new ApplicationDbContext();

        static MenuController()
        {
            
        }
        [Authorize]
        public IList<Product> Get()
        {
            string userId = User.Identity.GetUserId();
            var products = _db.Products.Where(p=>p.UserId== userId).ToList();
            
            return products;
        }

        [Authorize(Roles="Admin")]
        public bool Post(Product product)
        {
            if (ModelState.IsValid)
            {
                string userId = User.Identity.GetUserId();
                product.UserId = userId;

                _db.Products.Add(product);
                _db.SaveChanges();
            }
            
            return true;
            
        }
    }
}
