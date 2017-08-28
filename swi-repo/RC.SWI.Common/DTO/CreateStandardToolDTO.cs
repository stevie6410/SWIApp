using System;

namespace RC.SWI.Common.DTO
{
    public class CreateStandardToolDTO
    {
        public string Name { get; set; } // Name (Primary key) (length: 255)
        public string Image { get; set; } // Image (Primary key)
        public bool HasCarePoint { get; set; } // HasCarePoint (Primary key)
        public string CarePoint { get; set; } // CarePoint (length: 255)
        public Guid? SWIMasterId { get; set; } // SWIId
    }
}