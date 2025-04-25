using Xunit;

namespace integrationTests
{
    public class BasicMathTests
    {
        [Fact]
        public void OnePlusOne_ShouldEqualTwo()
        {
            int a = 1;
            int b = 1;

            int result = a + b;

            Assert.Equal(2, result);
        }
    }
}
