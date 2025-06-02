using System;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
    {
        
        if (!userManager.Users.Any())
                {
                    var users = new List<AppUser>();
                    users.Add(new AppUser
                        {
                            DisplayName = "Ahmad",
                            UserName = "Ahmad",
                            Email = "ahmad@tsetmc.com",
                        });
                        

                    foreach (var user in users)
                    {
                        await userManager.CreateAsync(user, "123456");
                    }
                }


        await context.SaveChangesAsync();
    }
}
