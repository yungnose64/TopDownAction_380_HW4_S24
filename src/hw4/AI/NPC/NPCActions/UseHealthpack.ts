import GameEvent from "../../../../Wolfie2D/Events/GameEvent";
import Battler from "../../../GameSystems/BattleSystem/Battler";
import Healthpack from "../../../GameSystems/ItemSystem/Items/Healthpack";
import { TargetableEntity } from "../../../GameSystems/Targeting/TargetableEntity";
import NPCActor from "../../../Actors/NPCActor";
import NPCBehavior from "../NPCBehavior";
import NPCAction from "./NPCAction";
import Finder from "../../../GameSystems/Searching/Finder";
import { ItemEvent } from "../../../Events";

export default class UseHealthpack extends NPCAction {
    
    // The targeting strategy used for this GotoAction - determines how the target is selected basically
    protected _targetFinder: Finder<Battler>;
    // The targets or Targetable entities 
    protected _targets: Battler[];
    // The target we are going to set the actor to target
    protected _target: Battler | null;

    public constructor(parent: NPCBehavior, actor: NPCActor) { 
        super(parent, actor);
    }

    public performAction(target: Battler): void {
        const inventory = this.actor.inventory;
        const healthpack = inventory.find(item => item instanceof Healthpack) as Healthpack;
        if (healthpack) {
            target.health += 5;
            this.emitter.fireEvent(ItemEvent.CONSUMABLE_USED);
            inventory.remove(healthpack.id);
        }
    }
}
