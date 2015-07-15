namespace JustinsCafe.Migrations
{
    using JustinsCafe.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<JustinsCafe.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(JustinsCafe.Models.ApplicationDbContext context)
        {
            UserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(context);
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(userStore);

            RoleStore<Role> roleStore = new RoleStore<Role>(context);
            RoleManager<Role> roleManager = new RoleManager<Role>(roleStore);

            if (!roleManager.RoleExists("Admin"))
                roleManager.Create(new Role { Name = "Admin" });

            if (!roleManager.RoleExists("User"))
                roleManager.Create(new Role { Name = "User" });

            ApplicationUser justin = userManager.FindByName("jplou001@fiu.edu");

            if (justin == null)
            {
                justin = new ApplicationUser{
                    UserName = "jplou001@fiu.edu",
                    Email = "jplou001@fiu.edu"
                };
                userManager.Create(justin, "123456");
                userManager.AddToRole(justin.Id, "Admin");

                justin = userManager.FindByName("jplou001@fiu.edu");
            }
            var products = context.Products.Where(p => p.UserId == null);

            foreach (var product in products)
            {
                product.UserId = justin.Id;
            }
        }
    }
}
