using System.Collections.Generic;
using System.Threading.Tasks;
using MobileBackend.Dtos.UserDtos;
using MobileBackend.Models;

namespace MobileBackend.Services.IServices
{
    public interface IUserService
    {
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
        Task<IEnumerable<User>> GetAll();
        Task<User> GetById(int id);
        Task Register(RegisterRequest model);
        Task Update(int id, UpdateRequest model);
        Task Delete(int id);
    }
}