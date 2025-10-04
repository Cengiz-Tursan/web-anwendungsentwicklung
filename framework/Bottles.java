public class Bottles {
	public static void main(String[] args){
		String drink = "beer";
		try { drink = args[0]; } catch(Exception x) {}
		for (int b = 99; b > 0; b--) {
			System.out.printf("""
			%d bottle%s of %s on the wall
			%d bottle%s of %s
			Take one down, pass it around
			%d bottle%s of %s on the wall.
			
			""",
			b, (b==1) ? "" : "s", drink,
			b, (b==1) ? "" : "s", drink,
			b - 1, (b==2) ? "" : "s", drink
			);
		}
		System.out.println("Go to the store, buy some more!");
	}
}