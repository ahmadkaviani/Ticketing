using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extentions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            services.AddIdentityCore<AppUser>(opt => { }).AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication();

            return services;
        }
    }
}
