//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace appicoDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class contact
    {
        public int guid { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public System.DateTime created { get; set; }
        public int dealer { get; set; }
        public int model { get; set; }
        public string message { get; set; }
    
        public virtual dealer dealer1 { get; set; }
        public virtual model model1 { get; set; }
    }
}
