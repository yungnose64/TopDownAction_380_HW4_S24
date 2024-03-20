import Stack from "../../Wolfie2D/DataTypes/Collections/Stack";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import NavPathStrat from "../../Wolfie2D/Pathfinding/Strategies/NavigationStrategy";
import GraphUtils from "../../Wolfie2D/Utils/GraphUtils";

/**
 * The AstarStrategy class is an extension of the abstract NavPathStrategy class. For our navigation system, you can
 * now specify and define your own pathfinding strategy. Originally, the two options were to use Djikstras or a
 * direct (point A -> point B) strategy. The only way to change how the pathfinding was done was by hard-coding things
 * into the classes associated with the navigation system. 
 * 
 * - Peter
 */
export default class AstarStrategy extends NavPathStrat {
    public buildPath(to: Vec2, from: Vec2): NavigationPath {
        let start = this.mesh.graph.snap(from);
        let end = this.mesh.graph.snap(to);

        let pathStack = new Stack<Vec2>(this.mesh.graph.numVertices);
        let openList = [start];
        let closedList = [];
        let parent = new Array(this.mesh.graph.numVertices).fill(0);

        console.log(start);
        console.log(end);

        while (openList.length > 0) {
            // node with lowest F-score
            let current = openList.shift(); 

            if (current === end) {
                let currentNode = end;
                while (currentNode !== start) {
                    pathStack.push(this.mesh.graph.positions[currentNode]);
                    currentNode = parent[currentNode];
                }
                return new NavigationPath(pathStack);
            }

            closedList.push(current);

            let neighbor = this.mesh.graph.getEdges(current);
            while (neighbor !== null) {
                if (!closedList.includes(neighbor.y)) {
                    if (!openList.includes(neighbor.y)) {
                        openList.push(neighbor.y);
                        parent[neighbor.y] = current;
                    }
                }
                neighbor = neighbor.next;
            }
        }

        return new NavigationPath(pathStack);
    }
}
