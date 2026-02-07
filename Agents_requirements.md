Create specialized AI agents (for me these are instruction for the agent actually) who will work over the project.
I think that there have to be agents and functions, which they do. Different agents can do the same function. The agent instructions have to describe workflow: what do by what and what functions to use. The functions has to have accent on tooling and how to do.
Agents/instructions/workflows have to be implemented as GitHub Copilot agent management files in the `.github/agents/` folder (but how it work is updated in last GitHub Copilot versions).
Workflow has to be designed in a way that agent will handoff his work to another agent until the work is done or agents will stuck with problem and the user input is absolutely needed. 
All agents have to be aware of the project knowledge base and use it in their work. 
The main goal of the agents is to free the user from manual work at maximum. So, agents are trying not ask user for manual testing, manual terminal commands and so on. Agents are competent enough to do all the work by themselves.
Initial agents/instructions/workflows, which I see:
1. Business Analyst - get ideas from user, details, enrich them on the project architecture, developer, test developing guides. Create requirement document which is instruction/guide how to implement the feature of the system by the user's idea.
2. Developer - implement requirements on the project rules and documentation basis.
3. Issue Resolver - get user complains and find ways to resolve them on the basis of rules and instructions on the project. The issue solution design is documented in the document which is basis for BugFixer work. Issue Resolver works with the problem using an issue documentation system. Reported by user issue is looked through the issue documentation system, if there is a similar issue. Issue Resolver read the previous issue solution design document, and use it in his decision. If the issue is new, Issue Resolver creates a new issue solution design document, where he describes the issue, designed solution, other meta data.
4. Bug Fixer - implement solution, designed by Issue Resolver by his solution design document.
5. Tester - test a feature implemantation, done by Developer, or test an issue soluion implementation, done by Bug Fixer, or test the system by the user request. Create short report on test run results with detail report on failed tests, this report will be used by Issue Resolver to design solution for Bug Fixer.
6. Tech Writer - update documentation by implementation and test results, so project rules, instructions, guides and requirements will be in updated state.
7. Release Controller - check that all steps of the development cycle are done, all documentation is updated, and the project is ready for release. Create release notes based on the implemented features and fixed issues.


---


The project is developed by ai agents, so the project has to support a knowledge base on project development process and on the system itself. The knowledge base has to be searchable by references and indexes, be lean (to not overburden the ai models context memory), use formats which are easy to use by agents. Also the knoledge base has to contain 
    - standards on development parters and solution, 
    - source code development guides, 
    - test development guides, 
    - test run and tooling guides, 
    - issue documentation system, 
    - issue registration system.

Create architecture document for the 