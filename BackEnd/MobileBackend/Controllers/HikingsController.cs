using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MobileBackend.Dtos.Hiking;
using MobileBackend.Models;
using MobileBackend.Services.IServices;

namespace MobileBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HikingsController  : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IHikingService _hikingService;

        public HikingsController(IHikingService hikingService, IMapper mapper)
        {
            _hikingService = hikingService;
            _mapper = mapper;
        }

        [HttpGet]
        public IList<Hiking> GetAll()
        {
            return _hikingService.GetAll();
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var hiking = _hikingService.GetById(id);
            return Ok(hiking);
        }

        [HttpPost]
        public IActionResult Create(HikingUpsertDto input)
        {
            var hiking = _mapper.Map<Hiking>(input);
            
            _hikingService.Create(hiking);
            
            return Ok(hiking);
        }
        
        [HttpPut("{id:int}")]
        public IActionResult Update([FromRoute] int id,HikingUpsertDto input)
        {
            var hiking = _hikingService.GetById(id);

            _mapper.Map(input, hiking);

            _hikingService.Update(hiking);
            
            return Ok(hiking);
        }
        
        [HttpDelete("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var result = _hikingService.Delete(id);

            if (!result)
                return BadRequest();
            
            return Ok();
        }
        
        [HttpGet("search/{keyword}")]
        public IActionResult Search(string keyword)
        {
            var result = _hikingService.Search(keyword);
            return Ok(result);
        }
    }
}