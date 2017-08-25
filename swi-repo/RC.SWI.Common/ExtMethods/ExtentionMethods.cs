using System;
using System.IO;
using System.IO.Compression;
using System.Security.Cryptography;

namespace RC.SWI.Common.ExtMethods
{
    public static class ExtentionMethods
    {
        public static string ToFileHash(this byte[] file)
        {
            using (var md5 = MD5.Create())
            {
                var hash = BitConverter.ToString(md5.ComputeHash(file)).Replace("-", "").ToLower();
                return hash;
            }
        }

        public static byte[] Compress(this byte[] data)
        {
            MemoryStream output = new MemoryStream();
            using (DeflateStream dstream = new DeflateStream(output, CompressionLevel.Optimal))
            {
                dstream.Write(data, 0, data.Length);
            }
            return output.ToArray();
        }

        public static byte[] Decompress(this byte[] data)
        {
            MemoryStream input = new MemoryStream(data);
            MemoryStream output = new MemoryStream();
            using (DeflateStream dstream = new DeflateStream(input, CompressionMode.Decompress))
            {
                dstream.CopyTo(output);
            }
            return output.ToArray();
        }

    }
}
