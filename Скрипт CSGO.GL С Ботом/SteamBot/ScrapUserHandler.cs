/*
==========ScrapUserHandler.cs==========

Scrapbanking bot written by waylaidwanderer (http://steamcommunity.com/id/waylaidwanderer/)

==How to use the scrapbanking bot when trading==

If you are selling weapons, simply add 2 weapons and the bot will automatically add 1 scrap. If you want to buy weapons, first you must type "buy", hit enter, and then type in what weapon you want. For example, if you wanted to buy The Original, type "original" and the bot will automatically add it for you if he has one in stock. To add multiple weapons at once, you can separate each search term with a comma. For example, you can type "original, black" to tell the bot to add The Original and a Black Box. If the bot has added the wrong item, type "remove", hit enter, and the type in the weapon name you wish to remove.

==Credit where credit is due - thanks to:==

Jessecar96 and Geel9 for coding SteamBot, allowing me to have hours and hours of fun
Derongan for helping me out a ton when I first started coding my scrapbanking bot
DrProfAxesome for also helping with the scrapbanking bot
*/


using SteamKit2;
using SteamTrade;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Timers;

namespace SteamBot
{
    public class ScrapUserHandler : UserHandler
    {
        public static string BotVersion = "1.0.0";
        public static int InviteTimerInterval = 2000;

        public int userScrapAdded = 0;
        public int userWepAdded = 0;
        public int botScrapAdded = 0;
        public int botWepAdded = 0;
        public int invalidItem = 0;
        public int inventoryScrap = 0;
        public int inventoryWeps = 0;

        public bool buyWeapons = false;
        public bool errorMsgRun = false;
        public bool remove = false;
        public bool InGroupChat = false;
        public bool HasRun = false;
        public bool TimerDisabled = true;
        public bool TimerEnabled = false;

        public System.Timers.Timer inviteMsgTimer = new System.Timers.Timer(InviteTimerInterval);

        static SteamID currentSID;

        public ScrapUserHandler(Bot bot, SteamID sid)
            : base(bot, sid)
        {

        }

        public override bool OnFriendAdd()
        {
            Bot.log.Success(Bot.SteamFriends.GetFriendPersonaName(OtherSID) + " (" + OtherSID.ToString() + ") added me!");
            inviteMsgTimer = new System.Timers.Timer();
            inviteMsgTimer.Interval = InviteTimerInterval;
            inviteMsgTimer.Elapsed += (sender, e) => OnInviteTimerElapsed(sender, e, EChatEntryType.ChatMsg);
            inviteMsgTimer.Enabled = true;
            return true;
        }

        public override void OnFriendRemove()
        {
            Bot.log.Success(Bot.SteamFriends.GetFriendPersonaName(OtherSID) + " (" + OtherSID.ToString() + ") removed me!");
        }

        public override void OnMessage(string message, EChatEntryType type)
        {
            message = message.ToLower();

            //REGULAR chat commands
            if ((message.Contains("love") || message.Contains("luv") || message.Contains("<3")) && (message.Contains("y") || message.Contains("u")))
            {
                Bot.SteamFriends.SendChatMessage(OtherSID, type, "I love you lots. <3");
            }
            else if (message.Contains("<3"))
            {
                Bot.SteamFriends.SendChatMessage(OtherSID, type, "<3");
            }
            else if (message.Contains("fuck") || message.Contains("suck") || message.Contains("dick") || message.Contains("cock") || message.Contains("tit") || message.Contains("boob") || message.Contains("pussy") || message.Contains("vagina") || message.Contains("cunt") || message.Contains("penis"))
            {
                Bot.SteamFriends.SendChatMessage(OtherSID, type, "Sorry, but as a robot I cannot perform sexual functions.");
            }
            else if (message.Contains("thank"))
            {
                Bot.SteamFriends.SendChatMessage(OtherSID, type, "You're welcome!");
            }
            else if (message == "buy")
            {
                Bot.SteamFriends.SendChatMessage(OtherSID, type, "Please type that into the TRADE WINDOW, not here!");
            }
            else if (message.Contains("help"))
            {
                Bot.SteamFriends.SendChatMessage(OtherSID, EChatEntryType.ChatMsg, "If you are selling weapons, simply add 2 weapons and the bot will automatically add 1 scrap. If you want to buy weapons, first you must type \"buy\" INTO THE TRADE WINDOW and then type in what weapon you want. For example, if you wanted to buy The Original, type \"original\" INTO THE TRADE WINDOW and the bot will automatically add it for you if he has one in stock. To add multiple weapons at once, you can separate each search term with a comma. For example, you can type \"original, black\" INTO THE TRADE WINDOW to tell the bot to add The Original and a Black Box.");
            }
            // ADMIN commands
            else if (message == "self.restart")
            {
                if (IsAdmin)
                {
                    // Starts a new instance of the program itself
                    var filename = System.Reflection.Assembly.GetExecutingAssembly().Location;
                    System.Diagnostics.Process.Start(filename);

                    // Closes the current process
                    Environment.Exit(0);
                }
            }
            else if (message == ".canceltrade")
            {
                if (IsAdmin)
                {
                    Trade.CancelTrade();
                    Bot.SteamFriends.SendChatMessage(currentSID, EChatEntryType.ChatMsg, "My creator has forcefully cancelled the trade. Whatever you were doing, he probably wants you to stop.");
                }
            }
            else
            {
                Bot.SteamFriends.SendChatMessage(OtherSID, type, Bot.ChatResponse);
            }
        }

        public override bool OnTradeRequest()
        {
            Bot.log.Success(Bot.SteamFriends.GetFriendPersonaName(OtherSID) + " (" + OtherSID.ToString() + ") has requested to trade with me!");
            return true;
        }

        public override void OnTradeError(string error)
        {
            Bot.SteamFriends.SendChatMessage(OtherSID,
                                              EChatEntryType.ChatMsg,
                                              "Error: " + error + "."
                                              );
            Bot.log.Warn(error);
            Bot.SteamFriends.SetPersonaState(EPersonaState.Trade);
        }

        public override void OnTradeTimeout()
        {
            Bot.SteamFriends.SendChatMessage(OtherSID, EChatEntryType.ChatMsg,
                                              "Sorry, but you were either AFK or took too long and the trade was canceled. If you would like to try again, please add yourself to the queue at http://www.thectscommunity.com/trade/scrapbank.php");
            Bot.log.Warn("User was kicked because he was AFK.");
            Bot.SteamFriends.SetPersonaState(EPersonaState.Trade);
        }

        public override void OnTradeInit()
        {
            Bot.SteamFriends.SetPersonaState(EPersonaState.Busy);
            ReInit();
            Bot.log.Warn("Opened trade with user.");
            Trade.SendMessage("Welcome to The CTS Community's public scrapbanking bot (v" + BotVersion + ")! This bot buys 2 weapons for 1 scrap or sells 2 weapons for 1 scrap. If you are looking to BUY weapons, type \"buy\", otherwise you can simply add your weapons and I will do the rest.");
            TradeCountInventory(true);
            Trade.SendMessage("Please add your items now. Type \"buy\" if you are buying weapons. You have 5 minutes to complete the trade or you will be kicked.");
        }

        public override void OnTradeAddItem(Schema.Item schemaItem, Inventory.Item inventoryItem)
        {
            var item = Trade.CurrentSchema.GetItem(schemaItem.Defindex);
            Bot.log.Success("User added: " + schemaItem.ItemName);
            if (invalidItem >= 4)
            {
                Trade.CancelTrade();
                Bot.SteamFriends.SendChatMessage(OtherSID, EChatEntryType.ChatMsg, "Stop messing around. This bot is used for scrapbanking, and he will only accept metal or craftable weapons.");
            }
            else if ((item.CraftClass == "weapon" || item.CraftMaterialType == "weapon") && !inventoryItem.IsNotCraftable)
            {
                if (inventoryItem.Quality.ToString() != "6" || item.Name.Contains("Festive"))
                {
                    Trade.SendMessage(schemaItem.ItemName + " is not a valid item! Please remove it from the trade.");
                    invalidItem++;
                    Bot.log.Warn("This is a special weapon and will not be accepted.");
                }
                else
                {
                    userWepAdded++;
                }
                if (inventoryScrap == 0)
                {
                    Trade.SendMessage("I have no more scrap so I can't accept any more weapons! Please remove the item.");
                    Bot.log.Warn("I don't have enough scrap to give to the user.");
                }
                else if (userWepAdded % 2 == 0 && userWepAdded != 0)
                {
                    Trade.AddItemByDefindex(5000);
                    botScrapAdded++;
                    inventoryScrap--;
                    Bot.log.Warn("I added: Scrap Metal");
                }
            }
            else if (item.Defindex == 5000)
            {
                userScrapAdded++;
            }
            else
            {
                Trade.SendMessage(schemaItem.ItemName + " is not a valid item! Please remove it from the trade.");
                invalidItem++;
            }
        }

        public override void OnTradeRemoveItem(Schema.Item schemaItem, Inventory.Item inventoryItem)
        {
            var item = Trade.CurrentSchema.GetItem(schemaItem.Defindex);
            Bot.log.Success("User removed: " + schemaItem.ItemName);
            if ((item.CraftClass == "weapon" || item.CraftMaterialType == "weapon") && !inventoryItem.IsNotCraftable)
            {
                if (inventoryItem.Quality.ToString() != "6" || item.Name.Contains("Festive"))
                {
                    invalidItem--;
                    Bot.log.Warn("User removed special item.");
                }
    			else
				{
					userWepAdded--;
				}
                if (userWepAdded < botScrapAdded * 2 && userWepAdded != 0)
                {
                    Trade.RemoveItemByDefindex(5000);
                    botScrapAdded--;
                    inventoryScrap++;
                    Bot.log.Warn("I removed: Scrap Metal");
                }
            }
            else if (item.Defindex == 5000)
            {
                userScrapAdded--;
            }
            else
            {
                invalidItem--;
            }
        }

        public override void OnTradeMessage(string message)
        {
            Bot.log.Info("[TRADE MESSAGE] " + message);
            message = message.ToLower();
            if (message == "buy")
            {
                Trade.SendMessage("You have chosen to buy weapons! Please type part of the weapon's name into the trade chat and I will try to find that weapon for you. You can also ask for multiple weapons by separating each search term with a \",\" (comma). To tell the bot to remove an item, type \"/remove\" first and hit enter, and then type the item name. For help, type \"help\".");
                Bot.SteamFriends.SendChatMessage(OtherSID, EChatEntryType.ChatMsg, "You have decided to buy weapons. Check my backpack at http://backpack.tf/id/ScrapsTheScrapbanker to see what I have! Remember the time limit, so make it quick!");
                buyWeapons = true;
            }
            else if (message == "help")
            {
                Trade.SendMessage("If you are selling weapons, simply add 2 weapons and the bot will automatically add 1 scrap. If you want to buy weapons, first you must type \"buy\" and then type in what weapon you want. For example, if you wanted to buy The Original, type \"original\" and the bot will automatically add it for you if he has one in stock. To add multiple weapons at once, you can separate each search term with a comma. For example, you can type \"original, black\" to tell the bot to add The Original and a Black Box.");

            }
            else if (buyWeapons)
            {
                if (message.Length >= 7 && message.Substring(0, 7) == "/remove")
                {
                    remove = true;
                    Trade.SendMessage("MODE: Remove items. To exit this mode type \"/add\".");
                }
                else if (message.Length >= 4 && message.Substring(0, 4) == "/add")
                {
                    remove = false;
                    Trade.SendMessage("MODE: Add items.");
                }
                else
                {
                    string[] splitmessage = message.Split(',');
                    Inventory.Item[] myitems = Trade.MyInventory.Items;
                    foreach (string weaponName in splitmessage)
                    {
                        int closestdefindex = FindClosestDefindexInInventory(myitems, weaponName);
                        if (closestdefindex == -1)
                        {
                            Trade.SendMessage("I can't find anything that sounds like " + weaponName);
                            Bot.log.Warn("They asked for something I don't have.");
                        }
                        else
                        {
                            if (remove)
                            {
                                if (Trade.RemoveItemByDefindex(closestdefindex) != false)
                                {
                                    Bot.log.Warn("They asked to remove " + weaponName + " and I found " + Trade.CurrentSchema.GetItem(closestdefindex).ItemName + " to be the closest match! Removing it now...");
                                    Trade.SendMessage("The closest thing I have to " + weaponName + " is a " + Trade.CurrentSchema.GetItem(closestdefindex).ItemName);
                                    botWepAdded--;
                                    Bot.log.Warn("I am offering them " + botWepAdded + " weapons and " + botScrapAdded + " scrap.");
                                }
                                else
                                {
                                    Trade.SendMessage("I couldn't find the item to remove!");
                                }
                            }
                            else
                            {
                                if (Trade.AddItemByDefindex(closestdefindex) != false)
                                {
                                    Bot.log.Warn("They asked for a " + weaponName + " and I found " + Trade.CurrentSchema.GetItem(closestdefindex).ItemName + " to be the closest match! Adding it now.");
                                    Trade.SendMessage("The closest thing I have to " + weaponName + " is a " + Trade.CurrentSchema.GetItem(closestdefindex).ItemName);
                                    botWepAdded++;
                                    Bot.log.Warn("I am offering them " + botWepAdded + " weapons and " + botScrapAdded + " scrap.");
                                }
                                else
                                {
                                    Trade.SendMessage("Something went wrong or my only \"" + weaponName + "\" is already being offered.");
                                }
                            }
                        }
                    }
                }
            }
        }

        public override void OnTradeReady(bool ready)
        {
            if (!ready)
            {
                Trade.SetReady(false);
                Bot.log.Warn("Unreadied trade.");
            }
            else
            {
                Bot.log.Success("User is ready to trade!");
                if (Validate())
                {
                    Trade.SetReady(true);
                }
            }
        }

        public override void OnTradeAccept()
        {
            if (Validate() || IsAdmin)
            {
                bool success = Trade.AcceptTrade();
                if (success)
                {
                    Bot.SteamFriends.SendChatMessage(OtherSID, EChatEntryType.ChatMsg, "Thanks for the trade! I had fun, so let's do it again sometime :) Please leave a +rep on my profile if you think I deserve one!");
                    Log.Success("Trade was successful!");
                    Bot.SteamFriends.SetPersonaState(EPersonaState.Trade);
                }
                else
                {
                    Log.Warn("Trade might have failed.");
                    Bot.SteamFriends.SetPersonaState(EPersonaState.Trade);
                }
            }
            OnTradeClose();
        }

        public override void OnTradeClose()
        {
            Bot.SteamFriends.SetPersonaState(EPersonaState.Trade);
            base.OnTradeClose();
        }

        public bool Validate()
        {
            List<string> errors = new List<string>();

            if (invalidItem > 0)
            {
                errors.Add("You have given me invalid items! Please remove them!");
                Bot.log.Warn("User has invalid items put up!");
            }
            if (userScrapAdded != (float)botWepAdded / 2 && botWepAdded > 0)
            {
                errors.Add("You've added the wrong amount of scrap!");
                Bot.log.Warn("User has added the wrong amount of scrap!");
            }
            if (botScrapAdded != (float)userWepAdded / 2 && botScrapAdded > 0)
            {
                errors.Add("The amount of weapons you've added isn't right!");
                Bot.log.Warn("User has added the wrong amount of weapons!");
            }

            // send the errors
            if (errors.Count != 0)
                Trade.SendMessage("There were errors in your trade: ");

            foreach (string error in errors)
            {
                Trade.SendMessage(error);
            }

            return errors.Count == 0;
        }

        public void TradeCountInventory(bool message)
        {
            // Let's count our inventory
            Inventory.Item[] inventory = Trade.MyInventory.Items;
            inventoryScrap = 0;
            inventoryWeps = 0;
            foreach (Inventory.Item item in inventory)
            {
                var weapon = Trade.CurrentSchema.GetItem(item.Defindex);
                if (item.Defindex == 5000)
                {
                    inventoryScrap++;
                }
                if (weapon.CraftClass == "weapon" && weapon.CraftMaterialType == "weapon" && !item.IsNotCraftable)
                {
                    inventoryWeps++;
                }
            }

            if (message)
            {
                Trade.SendMessage("Current stock: I have " + inventoryScrap + " scrap and " + inventoryWeps + " weapons in my backpack. I can afford to buy " + inventoryScrap * 2 + " weapons.");
                Bot.log.Success("Current stock: I have " + inventoryScrap + " scrap in my backpack. I can afford to buy " + inventoryScrap * 2 + " weapons.");
            }
        }

        public void ReInit()
        {
            userScrapAdded = 0;
            userWepAdded = 0;
            botScrapAdded = 0;
            botWepAdded = 0;
            inventoryScrap = 0;
            invalidItem = 0;
            errorMsgRun = false;
            buyWeapons = false;
            remove = false;
            currentSID = OtherSID;
        }

        private void OnInviteTimerElapsed(object source, ElapsedEventArgs e, EChatEntryType type)
        {
            Bot.SteamFriends.SendChatMessage(OtherSID, EChatEntryType.ChatMsg, "Hi. You have added The CTS Community's scrapbanking bot! I buy two weapons for one scrap and sell two weapons for one scrap. Check my backpack if you are buying weapons, and then trade me to begin!");
            Bot.log.Success("Sent welcome message.");
            inviteMsgTimer.Enabled = false;
            inviteMsgTimer.Stop();
        }

        public int FindClosestDefindexInInventory(Inventory.Item[] inventory, string word)
        {
            if (word.Length < 4)
            {
                Trade.SendMessage("You need to give me more of the weapon's name!");
                return -1;
            }
            Dictionary<string, int> inventorydict = new Dictionary<string, int>();
            foreach (Inventory.Item item in inventory)
            {
                if (inventorydict.ContainsKey(Trade.CurrentSchema.GetItem(item.Defindex).ItemName.ToLower()) == false && (Trade.CurrentSchema.GetItem(item.Defindex).CraftClass == "weapon" || Trade.CurrentSchema.GetItem(item.Defindex).CraftMaterialType == "weapon"))
                {
                    inventorydict.Add(Trade.CurrentSchema.GetItem(item.Defindex).ItemName.ToLower(), item.Defindex);
                }
            }
            int closestindex = -1;
            int closestdistance = 0;
            int count = 0;
            foreach (string key in inventorydict.Keys)
            {
                int c = LevDistance(key, word);
                if (c < closestdistance || closestindex == -1)
                {
                    closestdistance = c;
                    closestindex = inventorydict[key];
                    count = 1;
                }
                else if (c == closestdistance)
                {
                    count += 1;
                }
                if (key.Contains(word))
                {
                    return inventorydict[key];
                }

            }
            if (count > 1)
            {
                return -1;
            }
            return closestindex;
        }

        public static int LevDistance(string s, string t)
        {
            int n = s.Length;
            int m = t.Length;
            int[,] d = new int[n + 1, m + 1];

            // Step 1
            if (n == 0)
            {
                return m;
            }

            if (m == 0)
            {
                return n;
            }

            // Step 2
            for (int i = 0; i <= n; d[i, 0] = i++)
            {
            }

            for (int j = 0; j <= m; d[0, j] = j++)
            {
            }

            // Step 3
            for (int i = 1; i <= n; i++)
            {
                //Step 4
                for (int j = 1; j <= m; j++)
                {
                    // Step 5
                    int cost = (t[j - 1] == s[i - 1]) ? 0 : 1;

                    // Step 6
                    d[i, j] = Math.Min(
                        Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1),
                        d[i - 1, j - 1] + cost);
                }
            }
            // Step 7
            return d[n, m];
        }
    }
}
