---
 layout: post
 author: Sviat Medved
 authors_git: loogle_18
 title: How We Temporarily Transformed Our Usual Workflow for a Tight Deadline
 description: Every time when we start working on a new project, short iteration or just a new feature, we almost always worry about a delivery deadline.
 date: 28-02-2016
 tags:
 - workflow
 
 categories:
 - blog
 - team
 ---
 
 <img src="https://cloud.githubusercontent.com/assets/5908100/12643922/e1c391ea-c5c7-11e5-9ee9-5767cfa03ab9.jpg" class="left" style="margin-right: 1em;" />
 
 ### Time makes rules
 
 Every time when we start working on a new project, short iteration or just a new feature, we almost always worry about a delivery deadline. «Do we have enough time for this feature?», «Will we do it in time before customer loses the trust to us...». We always try to give an accurate estimation. We always wonder: «Will we be able to make it within this ETA and own workflow?». But, sometimes, when we had begun working on a particular task and had investigated it deeper, you realise that you don’t fit into the initial estimation.
 
 <!--cut-->
 
 ### Our workflow
 
 Our workflow is a mixture of Kanban and Scrum methodologies.
 
 For example, we use default scrum board, but WIP is controlled by our workflow states; we have something like «daily scrum», but per week; we have clearly defined scrum roles, but our team is not cross-functional and its members specialize in certain tasks. Also, we plan the set of tasks for the following week (Sprints) in a close cooperation with our customers and usually wait for the next sprint with new changes. But sometimes we can add high-priority tasks to the current sprint. When the code is ready, it is subject to testing and code reviewing (twice!). Each stage repeats until result matches task requirements and style guides which we follow. In our work processes we stand for a couple of simple rules:
 
  - High priority tasks first.
  - Cover new changes with tests.
  - Add tests before fixing new bugs.
  - Do not merge until tests are green.
  - Do not merge your own branches.
  - And once we have broken all the rules...
 
 ### Rush development
 One morning after a regular meeting with our customer we figured out that we have to implement huge changes in three days. Considering that before this day estimations were longer (about tenfold more), we had no idea how we can do it in the shortest time possible. Needless to say that day we had one more meeting asap. We have strong loyalty relation with this customer and have been building long-term success with him, so we have not refused a task and after some time of thoughts and calculation of story points, we started heavy work.
 Just imagine the following: ten developers; about seventy percent of uncompleted work; all team works hard in a single branch on a huge web application and solves conflicts, which naturally appear in similar situations.
 Ruby developers make new layouts according to the complicated mockups, front-end team changes Rails helpers and team lead pushes fully implemented pages one by one. Such mode did not give us even the slightest chance for an accurate division of roles. Each member was a manager, a developer and a tester. Everybody had to be sure in their work quality, whenever he's done something, and in the work of a person who pushed commit before him. If rebase brings some bugs from the previous commit - these bugs become yours. But, anyway, help came quickly as soon as you needed it because all developers stuck to one simple rule: "One task down for someone - one task down for the whole team..."
 This proceeded from morning (~ 10 AM) to deep night (~ 3-4 AM) for the whole three days. And after such wild development process we were done with all tasks and have presented a redesigned application, which was naturally crude, but nevertheless was acceptable to our customer.
 
 ### Why should you avoid it?
 The main reason is the price you have to pay.
 
 #### Team members health
 It means exhaustion of an organism physically and psychologically. And the head and eyes which ached a bit for a week after our experience from time to time were not the worst. The worst is a feeling of a certain lostness which did not leave some members of our team throughout a long time. And I need to mention the efforts you have to make to return to the work/rest mode habitual for you...
 
 #### Project health
 But all the above-mentioned reasons concern only a human factor (team members’ health, to be exact). But what about the project and its "health"? Those three days of fast development set aside a bunch of technical debts in a form of the absence of tests and difficult-to-support back-end logic, which has polluted our views, many duplications in CSS files and javascript functions which might not have worked in all cases. Therefore, besides the worsened health, you will be expected by a heap of technical debts, which will take months to be paid.
 
 ### To sum up
 This tense deadline and a rush development style were very stressful for our team.
 But thanks to it we have not only become a more amicable team, but also learned to adapt to extreme situations. The only positive moment, except for the experience which we received, is the unity. I do not want to tell that you cannot be the real team in your usual workflow. But anyway, having a common enemy (many tasks, which must be done in a short time) brings together and makes team unity stronger.
 Nevertheless, I may recommend this workflow only for very extreme cases. So if you have a time issue or you want to try the new you can try something similar, at your own risk of course.
