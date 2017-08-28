using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;
using RC.SWI.Entities;

namespace RC.SWI.Common.ExtMethods
{
    public static class DocumentExtMethods
    {
        public static Document ToDocument(this DocumentUpdateDTO docUpdate)
        {
            if (docUpdate == null) return null;
            return new Document
            {
                Name = docUpdate.Name,
                CreatedBy = docUpdate.Username,
                DocumentTypeId = docUpdate.DocumentTypeId,
                CheckedOutBy = docUpdate.Username,
                AppVersion = docUpdate.AppVersion,
                CreatedOn = DateTime.Now,
                CheckedOut = true,
                CheckedOutOn = DateTime.Now
            };
        }

        public static Document ToDocument(this CreateDocumentDTO docUpdate)
        {
            if (docUpdate == null) return null;
            return new Document
            {
                Name = docUpdate.Name,
                CreatedBy = docUpdate.Username,
                DocumentTypeId = docUpdate.DocumentTypeId,
                CheckedOutBy = docUpdate.Username,
                AppVersion = docUpdate.AppVersion,
                CreatedOn = DateTime.Now,
                CheckedOut = true,
                CheckedOutOn = DateTime.Now
            };
        }

    }
}
