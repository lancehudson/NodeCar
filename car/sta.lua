print("Ready to Set up wifi mode")
wifi.setmode(wifi.STATION)

wifi.sta.config("Familab","#$familab#$"); --ssid and password
wifi.sta.connect();
local cnt = 0
tmr.alarm(0, 1000, 1, function() 
    if (wifi.sta.getip() == nil) and (cnt < 20) then 
        print("Trying Connect to Router, Waiting...");
        cnt = cnt + 1;
    else 
        tmr.stop(0);
        if (cnt < 20) then
            print("Config done, IP is "..wifi.sta.getip());
        else 
            print("Wifi setup time more than 20s, Please verify wifi.sta.config() function. Then re-download the file.");
        end
        cnt = nil;
        collectgarbage();
        dofile("DoitCarControlSTA.lc");
    end 
end)