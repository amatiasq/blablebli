Feature: Curry functions
	A basic feature to use functional programming is the hability to invoke a
	function with less parameters than required and producing a partial
	application

	Scenario: Invoke a function with all arguments needed
		Given I create a function than recive 3 arguments
		  And I curry it
		 When I invoke it with 3 arguments
		 Then It should be invoked once

	Scenario: Invoke a function less arguments than needed
		Given I create a function than recive 2 arguments
		  And I curry it
		 When I invoke it with 1 argument
		 Then It should not be invoked
