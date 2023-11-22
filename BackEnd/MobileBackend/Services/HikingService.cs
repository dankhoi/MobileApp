using System;
using System.Collections.Generic;
using System.Linq;
using MobileBackend.DbContext;
using MobileBackend.Models;
using MobileBackend.Services.IServices;

namespace MobileBackend.Services
{
    public class HikingService : IHikingService
    {
        private readonly ApplicationDbContext _db;

        public HikingService(ApplicationDbContext db)
        {
            _db = db;
        }
        public IList<Hiking> GetAll()
        {
            return _db.Hikings.ToList();
        }

        public Hiking GetById(int id)
        {
            try
            {
                var hiking = _db.Hikings.FirstOrDefault(x => x.Id == id);
                if (hiking == null)
                    throw new NullReferenceException();
                return hiking;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Hiking Create(Hiking input)
        {
            try
            {
                // validation
                _db.Hikings.Add(input);
                _db.SaveChanges();
                return input;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Hiking  Update(Hiking input)
        {
            try
            {
                _db.Hikings.Update(input);
                _db.SaveChanges();
                return input;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                var hiking = _db.Hikings.FirstOrDefault(x => x.Id == id);
                if (hiking == null)
                    return false;
                _db.Hikings.Remove(hiking);
                _db.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        public List<Hiking> Search(string keyword)
        {
            var result = _db.Hikings.Where(_ => _.Name.ToLower().Trim().Contains(keyword.ToLower().Trim())).ToList();
            return result;
        }
    }
}