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
            var users = new List<AppUser>
                    {
                    new ()
                        {
                            DisplayName = "Ahmad",
                            UserName = "Ahmad",
                            Email = "ahmad@tsetmc.com",
                        }
                    };



            foreach (var user in users)
            {
                var result = await userManager.CreateAsync(user, "Password123!");

                if (!result.Succeeded)
                {
                    Console.WriteLine("User creation failed:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"- {error.Description}");
                    }
                }
                else
                {
                    Console.WriteLine("User created successfully.");
                }
            }
        }


        await context.SaveChangesAsync();
    }
}
