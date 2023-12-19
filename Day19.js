fs = require('fs');
fs.readFile('Day19.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let [workflows, parts] = data.split('\n\n');
    workflows = workflows.split("\n");
    parts = parts.split("\n").map(part => {
        let pattern = /(\d+)/g;
        let [x, m, a, s] = part.match(pattern);
        return {x, m, a, s};
    });

    workflows = workflows.reduce((acc, workflow) => {
        let pattern = /(\w+){(.+)}/;
        let [_, name, rules] = workflow.match(pattern);
        rules = rules.split(",");
        rules = rules.map(longRule => {
            let [rule, goto] = longRule.split(":");
            return {
                rule,
                goto
            }
        })
        acc[name] = rules;
        return acc;
    }, {});

    function isAccepted(part, workflow, workflowIndex) {
        let {rule, goto} = workflow[workflowIndex];
        if(rule === "A") return true;
        if(rule  === "R") return false;


        // no more rules to evaluate
        if(!goto) {
            if(rule === "A") return true;
            if(rule  === "R") return false;
            return isAccepted(part, workflows[rule], 0);
        }

        let evalString = part[rule.charAt(0)] + rule.substring(1);
        // the evaluation of the rule is successful
        if(eval(evalString)) {
            if(goto === "A") return true;
            if(goto  === "R") return false;
            return isAccepted(part, workflows[goto], 0);
        }

        // evaluation not successful
        return isAccepted(part, workflow, workflowIndex + 1);
    }


    let acceptedParts = [];
    parts.forEach(part => {
        // start at `in`
        if(isAccepted(part, workflows.in, 0)) acceptedParts.push(part);

    });


    let sum = acceptedParts.reduce((acc, part) => {
        Object.keys(part).forEach(rating => {
            acc += Number(part[rating]);
        })
        return acc;
    }, 0);

    console.log("P1", sum);
    console.log(workflows)
});