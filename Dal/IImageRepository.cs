using System;
using System.Collections.Generic;

namespace Dal
{
    public interface IImageRepository
    {
        IEnumerable<string> GetSequence(int offset, int count);
    }
}
