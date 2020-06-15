using appicoDataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Web.Http.Cors;

namespace AppicoTest.Controllers
{
    public class AppicoController : ApiController
    {
        appico_testEntities entities = new appico_testEntities();
        [Route("api/inventory")]
        [HttpGet]
        public IEnumerable<inventory> Getinventory()
        {
          
                return entities.inventories.ToList();
            
        }
        [Route("api/contacts")]
        public IEnumerable<contact> Getcontact()
        {
                return entities.contacts.ToList();
            
        }
        [Route("api/models")]
        public IEnumerable<model> Getmodels()
        {
            
                return entities.models.ToList();
            }

        [Route("api/dealers")]
        public IEnumerable<dealer> Getdealers()
        {
            
                return entities.dealers.ToList();
            
        }
        
        [Route("api/submit")]
        public HttpResponseMessage Post(contact contact)
        {
            
            try
            {
                contact.created = DateTime.Now;
                System.Diagnostics.Debug.WriteLine(contact.created);
                entities.contacts.Add(contact);
                entities.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.Created, contact);
            }
            catch (Exception ex)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
