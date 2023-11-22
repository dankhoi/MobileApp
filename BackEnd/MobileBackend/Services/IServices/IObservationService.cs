using System.Collections.Generic;
using MobileBackend.Models;

namespace MobileBackend.Services.IServices
{
    public interface IObservationService
    {
        IList<Observation> GetAll(int hikingId);
        Observation GetById(int id);
        Observation Create(Observation input);
        Observation Update(Observation input);
        bool Delete(int id);
    }
}