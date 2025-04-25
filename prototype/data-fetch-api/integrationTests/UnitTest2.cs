using Xunit;

namespace integrationTests;

public class UnitTest2
{
    [Fact]
    public void Test1()
    {
        int a = 5;
        int b = 10;

        int result = a + b;

        Assert.Equal(15, result);
    }
}